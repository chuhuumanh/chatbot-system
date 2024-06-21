
# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
import openai
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import re


# Khởi tạo Flask app
app = Flask(__name__)
embeddings = OpenAIEmbeddings(openai_api_key=openai.api_key, model="text-embedding-ada-002")

# Tải FAISS index từ tệp
vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# Khởi tạo mô hình OpenAI LLM
llm = OpenAI(api_key=openai.api_key,temperature=0.1)

# Prompt template cho việc truy vấn
prompt_template = """
Based on the given context, provide detailed information about the properties including Title, address, bedrooms, and price. The response should include:
- Title
- Address
- Bedrooms
- Price

Context:
{context}
"""

prompt = PromptTemplate.from_template(prompt_template)

# Initialise RetrievalQA Chain
rag_chain = RetrievalQA.from_chain_type(
    llm,
    retriever=vector_store.as_retriever(),
    return_source_documents=True,
    chain_type_kwargs={"prompt": prompt},
)

# Hàm để truy vấn RAG chain
def query_rag(query_text):
    # Thực hiện truy vấn sử dụng RAG
    response = rag_chain.invoke({"query" : query_text})
    return response


def extract_property_id(query):
    match = re.search(r'DEPARTMENT-(\d+)', query, re.IGNORECASE)
    if match:
        return match.group(0)
    return None

# Hàm xử lý hành động dựa trên ý định của người dùng
def handle_intent(intent, query):
    if "Greet the user" in intent:
        return "Hello! How can I assist you today?"
    elif "Find property detail" in intent:
        property_id = extract_property_id(query)
        if property_id:
            detailed_query = f"Give me the details for property id {property_id} only."
            msg = query_rag(detailed_query)
            response = msg.get('result', 'No details found for the specified property id.')
        else:
            msg = query_rag(query)
            response = msg.get('result', 'No details found.')

            if not response or response.strip() == "":
             response = "Please provide more detailed information."
        return response
    elif "Get list of properties" in intent:
        msg = query_rag(query)
        response = msg.get('result', 'Can you describe more specifically the property you are looking for?')
        return response
    elif "Book an appointment" in intent:
        print(query)
        property_id = extract_property_id(query)
        print(property_id)
        if property_id:
            return f"propertyId:{property_id}"
        else:
            return "Please provide the code of the property you need to create a booking appointment"
    elif "Enter email" in intent:
        return query
    else:
        return "Can you give more details?"


def identify_intent(query):
    # Prompt cho GPT-3.5 để xác định ý định của người dùng
    prompt = f"""
Identify the user's intent from the following query:

'{query}'

Possible intents:
1. Greet the user
2. Find property detail
3. Get list of properties
4. Book an appointment
5. Enter email


Respond with one of the possible intents clearly.
"""
    response = openai.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        temperature=0
    )
    
    # Lấy text response từ GPT-3.5
    response_text = response.choices[0].text.strip()

    # Các ý định hợp lệ
    valid_intents = {
        "Greet the user": "Greet the user",
        "Find property detail": "Find property detail",
        "Get list of properties": "Get list of properties",
        "Book an appointment": "Book an appointment",
        "Enter email": "Enter email"
    }
    
    # Kiểm tra và lấy intent từ response
    for intent in valid_intents:
        if intent.lower() in response_text.lower():
            return valid_intents[intent]

    return "Unknown intent"

@app.route('/api/query', methods=['POST'])
def api_query():
    data = request.json
    message = data.get('message', '')
    # Xác định ý định của người dùng
    intent = identify_intent(message)
    print(intent)

    response_message= handle_intent(intent,message)
       # Xử lý hành động dựa trên ý định của người dùng
    # response_message = query_rag(message)['result']
    # print(response_message)

    return jsonify({
        'intent' : intent,
        'response_message' : response_message
    })

if __name__ == '__main__':
    app.run(debug=True)