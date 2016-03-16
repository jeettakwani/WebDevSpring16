/**
 * Created by jtakwani on 3/15/16.
 */
module.exports = function(app, model){

    app.post('/api/assignment/user',createUser);
    app.get('/api/assignment/user',getUsers);
    app.get('/api/assignment/user/:id',getUserById);
    //app.get('/api/assignment/user', getUserByUsername);
    //app.get('/api/assignment/user?username=username&password=password',findUserByCredentials);
    app.put('/api/assignment/user/:id',updateUser);
    app.delete('/api/assignment/user/:id',deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user = model.createUser(user);
        if(user) {
            res.send(200);
            return;
        }
        res.json({message:"User not created"});
    }

    function getUsers(req, res) {
        if(Object.keys(req.query).length === 1) {
            var username = req.query.username;
            res.json(getUserByUsername(username));
        }
        else if(Object.keys(req.query).length === 2) {
            var username = req.query.username;
            var password = req.query.password;
            res.json(getUserByCredentials(username,password));
            return;
        }
        else {
            var users = model.findAllUsers();
            res.json(users);
        }
    }

    function getUserById(req, res) {
        var id = req.params.id;
        var user = model.findUserById(id);
        if(user) {
            res.json(user);
            return;
        }
        res.json({message: "User not found"});
    }

    function getUserByUsername(username) {
        var user = model.findUserByUsername(username);
        console.log(user);
        if(user) {
            return user;
        }
        return {message: "User Not found"};
    }

    function getUserByCredentials(username,password) {
        var credentials = {
            username: username,
            password: password
        };

        var user = model.findUserByCredentials(credentials);
        console.log(user);
        if(user) {
            return user;
        }
        return {message: "User Not found"};
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;

        var user = model.updateUser(user);
        if(user) {
            res.send(200);
            return;
        }
        res.send(404);
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        if(model.deleteUserById(id)) {
            res.send(200);
            return;
        }
        res.json ({message: "User not found"});
    }

};