function Produto(connection) {
    return {
        insert: (req, res) => {

            
        }, remove: (req, res) => {

        }, update: (req, res) => {

        }, select: (req, res) => {
            const { ean }  =  req.params;
            
            if (ean && ean.length < 8 ) {
                res.send({error: 'Produto Inválido'})
            } else {
                connection.query(`select * from produtos where ean = ${ean}`, (error, results, fields) => {

                    if (error ) {
                        res.send({error: error })
                     } else {
                        res.send({produtos: results})
                     }
                })
            }
        
        }
    }
}

module.exports = Produto;