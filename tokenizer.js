/**
 * This Tokenizer Program processes text files to identify and extract tokens
 * based on defined lexical rules, and outputs these tokens to a specified file.
 * The program is implemented in JavaScript and uses Node.js run-time for execution.
 * It involves recursive functions for parsing and tokenizing text, effectively
 * handling various token types including numbers, comparison operators, and
 * alphabetic strings. This project is an upper level abstracation of how lexical
 * analysis in compilers or interpreters work.
 *
 * @author Dagmawi Negatu
 * @author Peter Wright
 * @date May 3, 2024
 */


//Store current index number to traverse the data string of input file.
var index = 0;

/**
 * Recursively scans and tokens from the provided data string based
 * on defined lexical rules defined in the get_token function. It continues
 * to parse until the end of the data string is reached and tokens is populated.
 * 
 * @param {string} data - The input string from which tokens are processed.
 * @param {Array} tokens - An array to store the tokens
 * @returns {Array} All array of tokens processed from the input string.
 */
function analyze(data, tokens = []) {
    //Check we have not reached the end of data string constructed via file input
    if(index < data.length){
        //Add processed token to valid array elements
        tokens.push(get_token(data));
        //Recusrviely build token at each innvocation
        analyze(data, tokens);
    }
    return tokens;//Return constructed token
}

/**
 * Extracts a single token from the provided data string based on the current
 * position of the * potential operators, or alphabetical characters as tokens.
 * The function incrementally builds a token starting from the current 'index'
 * and adjusts the 'index' as it consumes characters from the data string. 
 * This function is designed to be called repeatedly to
 * tokenize an entire string.
 *
 * @param {string} data - The input string from which tokens are to be extracted.
 * @returns {string} The next token extracted from the data string. 
 * No token pattern is recognized initially, it falls back to extracting
 * a single character as a token.
 */
function get_token(data) {
    let token = "";// Initialize an empty string to build the token
    //Check if it is a number.
    while(index < data.length && /[0-9]/.test(data[index])){
        token += data[index++];//Add the number to the token and increment index
    }
    // If no number was found, check the next character
    if(token === ""){
        token += data[index++];
        // Check if the current token can be part of a comparison operator
        if(index < data.length
            && /=|!|<|>/.test(token) 
            && data[index] === "="){
                token += data[index++];// Add = to token and increment the index
            }
    }
    

    //Check if it is english alphabet.
    if(/[a-zA-Z]/.test(token)){
        while(index < data.length && /[a-zA-Z]/.test(data[index])){
            token += data[index++];//Continue to append while alphabetic characters
        }
    }
    return token;// Constructed token
}

/**
 * Maps the next token from the provided string based on the global index.
 * This function can identify numbers, operators,
 * and alphabetic tokens and maping defintions of the tokens identified. 
 * The function advances the global index as it processes the string,
 * extracting and maping one token in a single invocation.
 *
 * @param data - The string from which the token is extracted.
 * @returns The next token from the current index position in the data string.
 */
function get_token_str(token) {
    let token_str = "";
    if (!isNaN(token)) {
        token_str = "an INT_LITERAL";
    } else if (token === "=") {
        token_str = "an ASSIGN_OP";
    } else if (token === "==") {
        token_str = "an EQUALS_OP";
    } else if (token === "<") {
        token_str = "a LESS_THEN_OP";
    } else if (token === "<=") {
        token_str = "a LESS_THEN_OR_EQUAL_OP";
    } else if (token === ">") {
        token_str = "a GREATER_THEN_OP";
    } else if (token === ">=") {
        token_str = "a GREATER_THEN_OR_EQUAL_OP";
    } else if (token === "!") {
        token_str = "a NOT_OP";
    } else if (token === "!=") {
        token_str = "a NOT_EQUALS_OP";
    } else if (token === "+") {
        token_str = "an ADD_OP";
    } else if (token === "-") {
        token_str = "a SUB_OP";
    } else if (token === "*") {
        token_str = "a MULT_OP";
    } else if (token === "/") {
        token_str = "a DIV_OP";
    } else if (token === "^") {
        token_str = "an EXPON_OP";
    } else if (token === "(") {
        token_str = "a LEFT_PAREN";
    } else if (token === ")") {
        token_str = "a RIGHT_PAREN";
    } else if (token === ";") {
        token_str = "a SEMI_COLON";
    }
    return token_str;
}

/**
 * Map an array of tokens to a new array 
 * of data determined by a given condition
 * 
 * @param {function} condition a condition needed for 
 *  the tokens to be mapped to.
 * @param {[]} tokens an array of tokens to be mapped 
 *  by its given condition.
 * @returns an array of mapped data based 
 *  on the given condition.
 */
function map(condition, tokens, index = 0, token_str = []) {
     // Check if the current index is within the bounds of the tokens array
    if(index < tokens.length){
        // Pass to condition function of current token and store result 
        token_str.push(condition(tokens[index]));
        // Recursive call to process the next token by incrementing the index
        map(condition, tokens, index + 1, token_str);
    }
    // Once all tokens are processed, return the results
    return token_str;
}

/**
 * Reduces two arrays in this case tokens and their
 * corrosponding strings in to one single string.
 * 
 * @param {function} combine a function that combine a single token 
 * and its corrosponding string in to a string.
 * @param {[]} tokens an array of tokens to be reduced.
 * @param {*} base the starting string for 
 * the two arrays to merge to.
 * @returns a single string formed from the two arrays.
 */
function reduce(combine, tokens, base, index = 0) {
    //Apply combine function to the current token and add the result to base
    if(index < tokens.length){
        base += combine(tokens[index]);
        //Recursively call reduce combining the rest of the tokens from next index
        base = reduce(combine, tokens, base, index + 1)
    }
    //Return the combined result after all tokens have been looked at
    return base;
}

/**
 * Filter an array of tokens based on a given condition.
 * 
 * @param {function} condition a condition needed for to 
 * filter out what is unwanted in the array of tokens.
 * @param {[]} tokens an array of tokens to be filtered.
 */
function filter(condition, tokens, index = 0, data = []) {
    // Check if the current index is less than the length of token
    if(index < tokens.length){
         // Condition to the current token and, if true add to the data array
        if(condition(tokens[index])){
            //Add to data array
            data.push(tokens[index]);
        }
         // Recursively call filter to process the next token
        filter(condition, tokens, index + 1, data);
    }

    // Return the filtered data once all tokens have been processed
    return data;
}

/**
 * Merges a token and its corrosponding string in to one single string.
 * 
 * @param {String[]} token_str an array of tokens strings
 * @returns an anonymous funtion that merge a single token 
 *      and its corrosponding string in to a single string of data. 
 */
function merge(token_str) {
    //Tracks the number of statements
    let statement_count = 1;
    //Reports lexeme number in each statement
    let lexeme_count = 0;
    //Used to count index numbers
    let index = 0;
    return (token) => {

        let result = "";// The merged string
        //Start of a new statement
        if (lexeme_count === -1) {
            lexeme_count++;
            result += "---------------------------------------------------------\n";
        }
        //If we are at a new statment, log statement details
        if (lexeme_count === 0) {
            result += "Statement #" + (statement_count++) + "\n";
        }

        //Allows reporting of lexical errors
        if (token_str[index].length === 0) {
            result += "===> '" + token + "' \nLexical error: not a lexeme\n";
        } else {
            result += "Lexeme " + (lexeme_count++) + " is " + token
                + " and is " + token_str[index] + "\n";
        }
        //Reset the lexeme count if at ending of current statement
        if (token === ";") {
            lexeme_count = -1;
        }
        index++;
        return result;
    }
}

/**
 * Takes in user input for input and output file.
 * Read the contents in the input file and 
 * determents the statements and lexemes in the file.
 * Put the result in the ouput file.
 * 
 * @param {String} in_file the name of input file.
 * @param {String} out_file the name of output file.
 */
function main(in_file, out_file) {
    const SIZE = 4; //Expected number of command line arguments
    let success = false;// Flag to check if the file operations were successful
    let error_message;// Variable to hold error messages

    // Check if the correct number of command line arguments is provided
    if (process.argv.length === SIZE) {
        try {
            var fs = require("fs");//Load the file system module to read/write files
            // Read the input file as a UTF-8 encoded string
            var data = fs.readFileSync(in_file, "utf8");
            // Check if the read data is empty
            if (data.length === 0) {
                // Set an error message indicating the file is empty
                error_message = "File: '" + in_file + "' is empty";
            } else {
                //If the file is not empty, set success to true to continue further
                success = true;
            }
        } catch (error) {
            // Catch block where the file could not be read
            error_message = "No such file: " + in_file;
        }
    } else {
        //If the number of command line arguments is incorrect, set an error message
        error_message = "Usage: node tokenizer.js inputFile outputFile";
    }
    
    // Check if the file was read successfully without any errors
    if (success) {
        // Analyze the data to extract tokens
        let tokens = analyze(data);
        //Filter out tokens that are white spaces tabs, new lines, returns, spaces
        tokens = filter((token) => !(/\t|\n|\r| /.test(token)), tokens);
        // Map tokens to a new format or structure if required
        let token_str = map(get_token_str, tokens);
        // Combine the mapped strings into a single string
        let new_data = reduce(merge(token_str), tokens, "");
        try {
        //Write the processed data back to the output file with UTF-8 encoding
        fs.writeFileSync(out_file, new_data, 'utf8');
        console.log("Data written successfully to", out_file);
        }   catch (error) {
        console.error("Failed to write to file:", error);
        }
    }
    

}

//Check if the script is being run directly from the command line
if (require.main === module) {
    //If true call main function command line arguments for input/output file paths
    main(process.argv[2], process.argv[3]);
}

