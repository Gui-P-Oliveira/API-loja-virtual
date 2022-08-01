import moment from "moment"

class TokenDTO {
    constructor({ _id, createdAt }) {
        const expireAt = moment(createdAt)

        expireAt.add(1, 'h')

        this.token = _id
        this.expireAt = expireAt.toDate()
    }
}

export default TokenDTO