function analyze(data) {
   

}


function get_token(data){

  

}

/**
 * Determines the category of a token 
 * and return a string of determined category
 * 
 * @param {*} token a token to be determine its category.
 * @returns a string that represents a category of a token.
 */
function get_token_str(token){
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
 * @param {*} condition a condition needed for 
 *                      the tokens to be mapped to.
 * @param {*} tokens an array of tokens to be mapped 
 *                   by its given condition.
 * @returns an array of mapped data based 
 *          on the given condition.
 */
function map(condition, tokens) {
    let token_str = [];
    for (let i in tokens) {
        token_str[i] = condition(tokens[i]);
    }
    return token_str;
}

/**
 * Reduces two arrays in this case tokens and their
 * corrosponding strings in to one single string.
 * 
 * @param {*} combine a function that combine a single token 
 *                    and its corrosponding string in to a string.
 * @param {*} tokens an array of tokens
 * @param {*} token_str an array of tokens strings
 * @param {*} base the starting string for 
 *                 the two arrays to merge to.
 * @returns a single string formed from the two arrays.
 */
function reduce(combine, tokens, token_str, base) {
    for(let i in tokens){
       base += combine(tokens[i], token_str[i]);
    }
    return base;
}

/**
 * Merges a token and its corrosponding string in to one single string.
 * 
 * @returns an anonymous funtion that merge a single token 
 *      and its corrosponding string in to a single string of data. 
 */
function merge() {
    let statement_count = 1;
    let lexeme_count = 0;
    
    return (token, token_str) => {
        
        let result = "";
        if (lexeme_count === -1) {
            lexeme_count++;
            result += "---------------------------------------------------------\n";
        }
        if(lexeme_count === 0){
            result += "Statement #" + (statement_count++) + "\n";
        }
        
        if (token_str.length === 0) {
            result += "===> '" + token + "' \nLexical error: not a lexeme\n";
        } else {
            result += "Lexeme " + (lexeme_count++) + " is " + token
            + " and is " + token_str + "\n";
        }
        if (token === ";") {
            lexeme_count = -1;
        }
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
    const SIZE = 4;
    let success = false;
    let error_message;

    if (process.argv.length === SIZE) {
        try {
            var fs = require("fs");
            var data = fs.readFileSync(in_file, "utf8");
            if (data.length === 0) {
                error_message = "File: '" + in_file + "' is empty";
            } else {
                success = true;
            }
        } catch (error) {
            error_message = "No such file: " + in_file;
        }
    } else {
        error_message = "Usage: node tokenizer.js inputFile outputFile";
    }

    if (success) {
        // let tokens = analyze(data);

        //test
        let tokens = ["1", "<=", "2", ";", "5", "@", "+", "abc",";"];

        let token_str = map(get_token_str, tokens);
        let new_data = reduce(merge(), tokens, token_str, "");
        fs.writeFileSync(out_file, new_data);
    } else {
        console.error(error_message);
    }

}

if (require.main === module) {
    main(process.argv[2], process.argv[3]);
} 
