import { gql } from "graphql-request";
export const AUTH_LOGIN =(email:string)=> gql`
 mutation LoginUser {
    loginUser(input: { email: "${email}" }) {
        id
        name
        email
        age
        password
        token
    }
}

`;