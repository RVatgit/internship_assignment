# internship_assignment
Here is All API as listed in assignment.
1) Signup with name, email, username ,password ,photo.
        ==> use API URL/register with body post
            - username
            - name
            - email
            - pwd = password
            - pwd2 = confirm password
            - pic = photo
2) Signin with username and password.
        ==> use API URL/login with body Post
            - username
            - password
3) View profile
        ==> use API URL/dash get
4) Edit Profile like name username password but not email.
        ==> use API URL/dash post request with body whatever you need to edit.
5) Delete profile 
        ==> use API URL/dash delete request

URL by default localhost:3000
make sure to start mongo service or provide proper URI in mongoose connection in index.js
