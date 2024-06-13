
# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
import openai
from langchain.chains import RetrievalQA
from langchain_community.llms import OpenAI
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain


# Khởi tạo Flask app
app = Flask(__name__)

embeddings = OpenAIEmbeddings(openai_api_key=openai.api_key, model="text-embedding-ada-002")

# Tải FAISS index từ tệp
vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# Khởi tạo mô hình OpenAI LLM
llm = OpenAI(api_key=openai.api_key)

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
    response = rag_chain({"query" : query_text})
    return response


# Hàm xử lý hành động dựa trên ý định của người dùng
def handle_intent(intent, query):
    if "Greet the user" in intent:
        return "Hello! How can I assist you today?"
    elif "Find property details" in intent:
        print(intent)
        msg = query_rag(query)
        return msg
    elif "Get list of properties" in intent:
        msg = query_rag(query)
        return msg
    elif "Book an appointment" in intent:
        # Logic đặt lịch hẹn cho bất động sản
        return "Please provide the property ID and preferred time for booking an appointment."
    else:
        response = query_rag(query)
        return response['result']


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
Respond with the intent clearly.
"""
    response = openai.completions.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt,
        temperature=0
    )
    intent = response.choices[0].text.strip()
    return intent

@app.route('/api/query', methods=['POST'])
def api_query():
    data = request.json
    message = data.get('message', '')
    # Xác định ý định của người dùng
    intent = identify_intent(message)

       # Xử lý hành động dựa trên ý định của người dùng
    response_message = handle_intent(intent, message)

    return jsonify({
        "intent": intent,
        'response_message' : response_message
    })

if __name__ == '__main__':
    app.run(debug=True)