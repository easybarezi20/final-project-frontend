<img width="auto" src="https://imgur.com/GFaoJsA" alt="">

# Finstagram
#### By Barezi Morales
#### [Finstagram Website](https://finstagram-bld.netlify.app/login)


## Getting Started
Welcome to Finstagram! Finstagram may sound familiar to the popular social media platform but it is far from it. <br>
Right from the beginning you are prompted to log in or sign up(please not if the log in page or sign up doesnt load on first try reload page)
<br>
Once signed in users can see their home page which showcases either post from followers they followed or if its your first time then it will display all post made on the app.
<br>
The explore tabs if where you will be able to see all post regardless of if your following or not
<br>
The create page allows users to uplaod their own photos off their devices as well as giving the post a title and a caption
<br>
Finally the profile page is where you will be able to see all the post youve made as well as how many people follow you and how may people you follow.

## Code Snippets
#### Singup Code
```
    router.post("/signup", (req, res) => {
    const { name, email, password, pic} = req.body
    if(!email || !password || !name){
       return res.status(422).json({error: "please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "user already exists with that email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                email,
                password: hashedpassword,
                name,
                pic:pic
            })
    
            user.save()
            .then(user => {
                res.json({message: "saved successfully"})
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    .catch(error => {
        console.log(error);
    })
})
```
#### Login Code
```
    router.post('/signin', (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message: "successfully signed in"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                const{ _id, name, email, followers, following, pic } = savedUser
                res.json({token, user:{_id, name, email, followers, following, pic}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
})
```
#### Cloud Posting
```
        const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "final-project")
        data.append("cloud_name", "dayu9uhsv")
        fetch("http://api.cloudinary.com/v1_1/dayu9uhsv/image/upload", {
            method:"POST",
            body:data
        })
        .then(res => res.json())
        .then(data => {
            setURL(data.url)
        })
        .catch(err => {
            console.log(err);
        }) 
    }
    useEffect(() => {
        if(url){
            fetch('https://radiant-harbor-76606.herokuapp.com/posts/createpost',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:url,
                })
            }).then(res => res.json())
            .then(data =>{
                console.log(data);
                navigate('/')
            })
        }
    }, [url])
```


## Technologies Used

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
