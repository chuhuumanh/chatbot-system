import PyPDF2
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
import openai


# Đặt API key cho OpenAI


# Hàm để trích xuất văn bản từ tệp PDF
def extract_text_from_pdf(pdf_file_path):
    text = ""
    with open(pdf_file_path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        number_of_pages = len(reader.pages)
        for page_num in range(number_of_pages):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

# Hàm để chia văn bản thành các đoạn dựa trên "Property Id"
def split_text_by_property_id(text):
    properties = text.split("Code:")
    if properties[0].strip() == "":
        properties = properties[1:]
    properties = ["Code:" + prop.strip() for prop in properties]
    return properties

# Đường dẫn tới tệp PDF chứa thông tin về bất động sản
pdf_file_path = "property_info.pdf"

# Trích xuất nội dung từ tệp PDF
pdf_text = extract_text_from_pdf(pdf_file_path)

# Chia văn bản thành các đoạn dựa trên "Property Id"
properties = split_text_by_property_id(pdf_text)
print(f"Extracted properties: {properties}")

# Khởi tạo embedding function với OpenAI
embeddings = OpenAIEmbeddings(openai_api_key=openai.api_key, model="text-embedding-ada-002")

# Tạo FAISS index từ các đoạn văn bản và embeddings
vector_store = FAISS.from_texts(properties, embeddings)

# Lưu FAISS index vào tệp cục bộ
vector_store.save_local("faiss_index")

# Tải FAISS index từ tệp (kiểm tra để đảm bảo nó hoạt động)
loaded_vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# Kiểm tra số lượng tài sản đã được lưu trữ
print(f"Number of properties indexed: {len(loaded_vector_store.index_to_docstore_id)}")