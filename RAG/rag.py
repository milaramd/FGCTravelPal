import os


# Prompt the user for their OpenAI API key
api_key = input("sk-proj-xaNVLwsV5OqLCQvzCVawT3BlbkFJXw5rggSNKtGOKkvgHZ2S")

# Set the API key as an environment variable
os.environ["OPENAI_API_KEY"] = api_key
# Optionally, check that the environment variable was set correctly
print("OPENAI_API_KEY has been set!")

txt_file_path = '/hackUAB/assets/assets/Converted_JSON_to_TXT.txt'
loader = TextLoader(file_path=txt_file_path, encoding="utf-8")
data = loader.load()

from langchain import Document, VectorStore, OpenAI # type: ignore

from langchain.document_loaders import TextLoader # type: ignore


# Supongamos que tenemos una lista de documentos, donde cada documento es una parada de tren con su información
documents = [
    Document(
        page_content="Horario de Vallvidrera Inferior...",
        metadata={"stop_id": "VR", "stop_name": "Vallvidrera Inferior"}
    ),
    # Añade más documentos según sea necesario
]

# Utiliza OpenAI Embeddings para convertir documentos en vectores
embedding_function = OpenAI("text-embedding-ada-002")
vectorstore = VectorStore.from_documents(documents, embedding_function)

# Guarda el índice en un archivo para su reutilización
vectorstore.save_local("train_stop_index")

embeddings = OpenAIEmbeddings()
vectorstore = FAISS.from_documents(data, embedding=embeddings)

llm = ChatOpenAI(temperature=0.7, model_name="gpt-4")

memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

conversation_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(),
    memory=memory
)

query = "Quina línea surt de Barcelona Pl. Espanya?"
result = conversation_chain({"question": query})
answer = result["answer"]
answer