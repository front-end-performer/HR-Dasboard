// import Axios from "axios"

// componentDidMount(){ 
//     const { data } = await Axios.get('/user');
//     this.setsState({
//         data
//     });


//     // Axios.get('/user').then(({ data }) => { 
//     //     this.setState({
//     //         data
//     //     })
//     // });
// }


app.get('/user', async () => { 
    const { rows } = await getUserById(req.sesion.userId);
    resizeBy.json(rows[0])

    // getUserByID(req.session.userId).then(({ rows }) => { 
    //     resizeBy.json(rows)
    // });
})

try { 
    const { rows } = await getUserById(req.sesion.userId);
    resizeBy.json(rows[0])
} catch(error){
    console.log(error);
    
    resizeBy.sendStatus(500)
}
 

// HOOKS

// 1. hooks can only be used in fubction components and in other hooks.
//    -- cant use in class components

// 2. hooks shouldn't be used in loops or conditionals(if/else)
// 3. all hooks must start with word "use"

// REDUX



