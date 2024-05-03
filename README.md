Tokenizer Program

Authors: Dagmawi Negatu, Peter Wright
Date of Submission: 5/3/2024 


Description

This Tokenizer Program is designed to process input text files, identify 
and extract tokens based on defined lexical rules, and output these tokens
to a specified file. The program is implemented in JavaScript and uses Node.js
for its execution. It involves recursive functions for parsing and tokenizing
the text, handling various token types including numbers, comparison operators,
and alphabetic strings.

Project Files

tokenizer.c: The main program source file that includes the tokenization logic.
unix_input.txt: Sample input file with
intentional errors for testing.

Run the program:

To verify the correct operation of the tokenizer, you can use the provided
unix_input.txt file.

node tokenizer.js unix_input.txt output.txt


After running the tokenizer as described above, compare
the output files to the expected output provided
output.txt.

The tokenizer should correctly categorize each token and
handle lexical errors for unrecognized symbols.


For any concerns or further guidance, please contact the authors.
