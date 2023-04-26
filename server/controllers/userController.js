const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database: 'user_management',
    password: 'sqlrootpassword'
})




exports.view = (req, res) =>{
    
    pool.getConnection((err, connection) =>{
        if(err) throw err;
        console.log('connected as ID ' + connection.threadId);

        connection.query('SELECT * FROM user where status = "active"', (err, rows) => {
            connection.release()

            if(!err){
                res.render('home', { rows })
            } else{
                console.log(err);
            }

            // console.log('Data from the user \n', rows)
        })
    });    
}


// find user by search
exports.find = (req, res) =>{
    
    pool.getConnection((err, connection) =>{
        if(err) throw err;
        console.log('connected as ID ' + connection.threadId);


        let searchTerm = req.body.search;
        connection.query('SELECT * FROM user where first_name like ? or last_name like ?',['%' + searchTerm + '%', '%' + searchTerm + '%'],(err, rows) => {
            connection.release()

            if(!err){
                res.render('home', { rows })
            } else{
                console.log(err);
            }

            console.log('Data from the user \n', rows)
        })
    });   
}

//add new user
exports.new = (req, res) =>{
    res.render('adduser')
}

exports.create = (req, res) =>{
    const {first_name, last_name, email, phone, comments} = req.body

      
    pool.getConnection((err, connection) =>{
        if(err) throw err;
        console.log('connected as ID ' + connection.threadId);


        let searchTerm = req.body.search;
        connection.query('insert into user set first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',[first_name, last_name, email, phone, comments],(err, rows) => {

            connection.release()
            if(!err){
                res.render('adduser', { alert: 'A new user has been added!' })
            } else{
                console.log(err);
            }

            // console.log('Data from the user \n', rows)
        })
    });   
}

exports.edit = (req, res) =>{
        
    pool.getConnection((err, connection) =>{
        if(err) throw err;
        console.log('connected as ID ' + connection.threadId);

        connection.query('SELECT * FROM user where ID = ?', [req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.render('edituser', { rows })
            } else{
                console.log(err);
            }

            // console.log('Data from the user \n', rows)
        })
    });
}


exports.updateuser = (req, res) =>{
        
    const {first_name, last_name, email, phone, comments} = req.body

    pool.getConnection((err, connection) =>{
        if(err) throw err;
        console.log('connected as ID ' + connection.threadId);

        connection.query('update user set first_name = ?, last_name = ? email = ?, phone = ? comments =? where ID = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
            connection.release()

        if(!err){
                            
            pool.getConnection((err, connection) =>{
                if(err) throw err;
                console.log('connected as ID ' + connection.threadId);

                connection.query('SELECT * FROM user where ID = ?', [req.params.id], (err, rows) => {
                    connection.release()

                    if(!err){
                        res.render('edituser', { rows, alert: `${first_name} has been updated`})
                    } else{
                        console.log(err);
                    }

                    // console.log('Data from the user \n', rows)
                })
            });
        } else{
            console.log(err);
            }

            // console.log('Data from the user \n', rows)
        })
    });
}


//delete user
exports.delete = (req, res) =>{
        
    // pool.getConnection((err, connection) =>{
    //     if(err) throw err;
    //     console.log('connected as ID ' + connection.threadId);

    //     connection.query('delete FROM user where ID = ?', [req.params.id], (err, rows) => {
    //         connection.release()

    //         if(!err){
    //             res.redirect('/' )
    //         } else{
    //             console.log(err);
    //         }

    //         // console.log('Data from the user \n', rows)
    //     })
    // });

    pool.getConnection((err, connection) =>{
        if(err) throw err;
        console.log('connected as ID ' + connection.threadId);

        connection.query('update user set status = ?  where ID = ?', ['removed', req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.redirect('/' )
            } else{
                console.log(err);
            }

            // console.log('Data from the user \n', rows)
        })
    });
}


//to view users
exports.watch = (req, res) =>{
    
    pool.getConnection((err, connection) =>{
        if(err) throw err;
        console.log('connected as ID ' + connection.threadId);

        connection.query('SELECT * FROM user where id = ?', [req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.render('viewuser', { rows })
            } else{
                console.log(err);
            }

            // console.log('Data from the user \n', rows)
        })
    });    
}
