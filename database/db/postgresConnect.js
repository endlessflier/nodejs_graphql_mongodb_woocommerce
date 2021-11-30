import { Client } from 'pg'

const createFormulaQuery = ({
    code,
    baseType,
    base,
    red,
    yellow,
    white,
    green,
    black
}) => `
    INSERT INTO "Formula" (code, basetype, base, red, yellow, white, green, black)
    VALUES ('${code}', '${baseType}', ${base}, ${red}, ${yellow}, ${white}, ${green}, ${black})
`;

class PostgresClient {
    constructor(p) {
      this.client = new Client({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
      })
    }

    init = async () => {
      await this?.client?.connect()
    }

    disconnect = async () => {
      await this.client.end()
    }

    getFormula = async (code) => {
      try {
        if (!code) return

        const response = await new Promise((resolve, reject) => {
          this?.client?.query(`SELECT * FROM "Formula" WHERE code = '${code}'`, (err, res) => {
            if (err) {
              reject(err)
            }
            resolve(res)
          })
        })

        const rows = response?.rows || []

        if (!response || rows?.length <= 0) {
          return null
        }

        const [formula] = rows

        return formula
      } catch (err) {
        throw Error(err)
      }
    }

    queryAllFormulas = async () => {
        const response = await new Promise((resolve, reject) => {
          this.client?.query('SELECT * FROM "Formula"', (err, res) => {
            if (err) {
              reject(err)
            }
            resolve(res)
          })
        })
      
        return response?.rows || []
      }

    createFormula = async (params) => {
        const response = await new Promise((resolve, reject) => {
          const query = createFormulaQuery(params)
          this.client?.query(query, (err, res) => {
            if (err) {
              reject(err)
            }
            resolve(res)
          })
        })
      
        return response?.rows || []
    }

    createMultipleFormulas = async (formulas) => {
        const failedFormulas = []
        await Promise.all(formulas.map(async (formula) => {
            try {
                await this.createFormula(formula)
            } catch (err) {
                console.info(err)
            }
        }))
       
    }
}

export const postgresClient = new PostgresClient()