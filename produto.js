function Produto(connection) {
    return {

        insert: (req, res) => {
            const produto = req.body;
            connection.query(`insert into produtos set ?`, produto, (error, results, fields) => {
                if (error ) {
                    res.send({error: error })
                 } else {
                    res.send({message: 'produto incluido com sucesso'})
                 }
            })

        }, remove: (req, res) => {
            const { id }  =  req.params;
            connection.query(`delete from produtos where id_produto = ${id}`, (error, results, fields) => {
                if (error ) {
                    res.send({error: error })
                 } else {
                    res.send({message: `${results.affectedRows} produto deletado com sucesso`});
                 }
            })

        }, update: (req, res) => {
            const { id }  =  req.params;
            const produto = req.body;
            connection.query(`update produtos set ? where id_produto = ${id}`, produto, (error, results, fields) => {
                if (error ) {
                    res.send({error: error })
                 } else {
                    res.send({message: 'produto atualizado com sucesso'})
                 }

            })

        }, select: (req, res) => {
            const { ean }  =  req.params;
            
            if (ean && ean.length < 8 ) {
                res.send({error: 'Produto Inválido'})
            } else if (ean) {
                connection.query(`select * from produtos where ean = ${ean}`, (error, results, fields) => {
                    if (error ) {
                        res.send({error: error })
                     } else {
                        const produto = results[0];
                        res.send({...produto})
                     }
                })
            }

        }, selectAll: (req, res) => {

            connection.query("select * from produtos ", (error, results, fields) => {
                    if (error ) {
                        res.send({error: error })
                     } else {
                        res.send({produtos: results})
                     }
            })
        }, selectCfopCst: (req, res) => {
            const { cfop, cst } = req.params;
                connection.query(`select * from produtos where cfop = ${cfop} and cst= ${cst}`, (error, results, fields) => {
                if (error ) {
                    res.send({error: error })
                } else {
                    res.send({produtos : results})
                }
            })
        }
    }
}

module.exports = Produto;