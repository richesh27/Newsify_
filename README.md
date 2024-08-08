# Project Name - Newsify

## Project Statement

A text classification system that can classify a given news headline in one or more categories.

## Team Members

-   [Amitesh Patel](https://github.com/Amitesh-Patel): Role (ML AI)
-   [Medha Tripathi](https://github.com/medha-tripathi): Role (Frontend)
-   [Richesh Kunwar](https://github.com/richesh27): Role (Frontend)
-    [Aditya Kumar](https://github.com/Ad1tyaKumar): Role (Backend)
-    [Nilesh Kumar Kamal](https://github.com/kamal9580): Role (Backend)

## Idea and approach

Our idea was to classify the text into three different ways - Multiclass classification , Sentiment analysis of articles, fake or real news classification , which could benefits as its time saving and help them understand the tone of the article.
Our approach is that we first search for the recent news articles using the Gnews API and scrape them , then we use NLP to extract the relevant text from the scrapped articles , then applied text summarization on the article to get summary of the articles and also applied a trained sentiment analysis model to extract sentiment of that article. Lastly we applied a Pretrained ML model on the articles to classify into different category .

## Tech Stacks

-  For Web - we have used ReactJS , NodeJS , Express JS, and MongoDB
-  For ML - we have used Pytorch and TensorFlow, Natural Language Processing (NLP) , and Flask 

## Demo

-   https://newsify-git-main-ad1tyakumar.vercel.app/
