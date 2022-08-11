import moment from "moment"

class TokenDTO {
    constructor({ _id, userRole, createdAt, }) {
        const expireAt = moment(createdAt)

        expireAt.add(2, 'hours')

        this.token = _id
        this.expireAt = expireAt.toDate()
        this.role = userRole
    }
}

export default TokenDTO