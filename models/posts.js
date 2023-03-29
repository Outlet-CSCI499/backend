const voting = {
    pepperoni: 0,
    cheese: 0,
    hawaiian: 0,
}

class Voting {

    // get total votes of poll
    static async tallyVotes() {
        // handling calculating the final results for our poll
        // and return those results

        return voting
    }

    // increase tally for the pizza that was voted for
    static async recordVote(pizzaName) {
        // increment the pizza name that was voted for
        // and return the final results

        if (voting[pizzaName] || voting[pizzaName] === 0) {
            voting[pizzaName] += 1
        }

        return Voting.tallyVotes()
    }

    

}

module.exports = Voting