import PyPDF2
import openai
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
import numpy as np


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

# Hàm để chia văn bản thành các đoạn dựa trên "Title:"
def split_text_by_title(text):
    properties = text.split("Title:")
    if properties[0].strip() == "":
        properties = properties[1:]
    properties = ["Title:" + prop.strip() for prop in properties]
    return properties

# Hàm để chuyển đổi thông tin bất động sản thành vector
def properties_to_vector(properties):
    vectors = []
    for prop in properties:
        title = ""
        bedrooms = 0
        bathrooms = 0
        price = 0

        lines = prop.splitlines()
        for line in lines:
            if line.startswith("Title:"):
                title = line.split("Title:")[1].strip()
            elif line.startswith("Bedrooms:"):
                try:
                    bedrooms = int(line.split("Bedrooms:")[1].strip())
                except ValueError:
                    pass
            elif line.startswith("Bathrooms:"):
                try:
                    bathrooms = int(line.split("Bathrooms:")[1].strip())
                except ValueError:
                    pass
            elif line.startswith("Price:"):
                try:
                    price = int(line.split("Price:")[1].strip())
                except ValueError:
                    pass
        
        vectors.append([title, bedrooms, bathrooms, price])

    return np.array(vectors)

# Đường dẫn tới tệp PDF chứa thông tin về bất động sản
pdf_file_path = "property_info.pdf"

# Trích xuất nội dung từ tệp PDF
pdf_text = extract_text_from_pdf(pdf_file_path)

# Chia văn bản thành các đoạn dựa trên "Title:"
properties = split_text_by_title(pdf_text)
print(f"Extracted properties: {properties}")

# Chuyển đổi các đoạn văn bản thành vectors
vectors = properties_to_vector(properties)
print(f"Các vectors: {vectors}")

# Chuyển đổi các vectors thành danh sách chuỗi để dùng `from_texts`
vector_texts = [f"Title: {v[0]}, Bedrooms: {v[1]}, Bathrooms: {v[2]}, Price: {v[3]}" for v in vectors]

# Khởi tạo embedding function với OpenAI
embeddings = OpenAIEmbeddings(openai_api_key=openai.api_key, model="text-embedding-ada-002")

# Tạo FAISS index từ các văn bản và embeddings
vector_store = FAISS.from_texts(vector_texts, embeddings)

# Lưu FAISS index vào tệp cục bộ
vector_store.save_local("faiss_index")

# Tải FAISS index từ tệp (kiểm tra để đảm bảo nó hoạt động)
loaded_vector_store = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

# Kiểm tra số lượng bất động sản đã được lưu trữ
print(f"Số lượng bất động sản đã được lập chỉ mục: {len(loaded_vector_store.index_to_docstore_id)}")