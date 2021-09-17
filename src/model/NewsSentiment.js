const NewsSentiment = function(data) {
    this.data = data;
    this.errors = [];
}

NewsSentiment.prototype.validateInput = function() {
    if(this.data =='') {
        this.errors.push("The field cannot be empty. Please enter a symbol")
    } 
}

module.exports = NewsSentiment;