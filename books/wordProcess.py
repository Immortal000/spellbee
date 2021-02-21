import nltk
import json

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

stop_words = set(stopwords.words("english"))
books = ["book1.txt", "book2.txt", "book3.txt", "book4.txt", "book5.txt", "book6.txt", "book7.txt", "book8.txt", "book9.txt", "book10.txt",
 "book11.txt", "book12.txt", "book13.txt", "book14.txt", "book15.txt", "book16.txt"]

json_data = {}


for file_name in books:
    print(file_name)
    book = open("/mnt/c/Users/kotth/OneDrive/Desktop/programming/next-projects/spell-bee/books/"+file_name)
    text = book.read()

    include = ['VBD', 'VBG', 'VBN', 'RB', 'RBR', 'RBS', 'VP', 'JJ']

    tokenizer = nltk.RegexpTokenizer(r"\w+")
    tokenized_text = tokenizer.tokenize(text)
    tokenized_text = [x.replace("_", " ") for x in tokenized_text]
    for x in tokenized_text:
        if "_" in x:
            print(True)

    tokenized_text = [x for x in tokenized_text if x.strip().lower() not in stop_words]
    stripped_text = [x.strip().lower() for x in tokenized_text]
    stripped_text = [x for x in stripped_text if x != ""]

    pos_tagged = nltk.pos_tag(stripped_text)
    pos_tagged = [key for key, value in pos_tagged if value in include]

    word_counter = nltk.Counter(pos_tagged)


    for key, value in word_counter.items():
        try:
            json_data[key.strip().lower()] += value
        except:
            json_data[key.strip().lower()] = value

final_json_data = json.dumps(json_data, indent=4)

with open("/mnt/c/Users/kotth/OneDrive/Desktop/programming/next-projects/spell-bee/resources/filteredWords.json", "w") as outfile: 
    outfile.write(final_json_data)
    

