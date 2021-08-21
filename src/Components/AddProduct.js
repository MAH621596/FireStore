import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
//import firebase from 'firebase';



class AddProduct extends React.Component{
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('Products');
        //generation of states
        this.state = {
            name: '',
            description:'',
            url : '',
            image : null,
        }    
    }
     //When we will change the state of the input text box it will call this onchangr function
      onChange = (e) => {
          const state = this.state;
          state[e.target.name] = e.target.value; // it will target the name and place it
          this.setState(state);

      }

      handleChange = (e) => {
          if(e.target.files[0]) {
              this.setState({
                  image : e.target.files[0]
              })
          }
          console.log(e.target.files[0]);
      }


      handleUpload = () => {
          const {image} = this.state;
          const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image);
        uploadTask.on('state_changed', (snapshot)=>{console.log('snapshot')},
        (error)=>{console.log(error);},
        ()=> {firebase.storage().ref('images').child(image.name).getDownloadURL().then(url=>{this.setState({url})})})
        }

     onSubmit =(e)=> {
         e.preventDefault();
         const {name, description} = this.state;
         this.ref.add({ //this.ref.add
             name,
             description,
             url : this.state.url
         }).then((docRef)=> {
             this.setState({
                 name :'',
                 description:'',
                 url:''
             });
             this.props.history.push("/")
         })

         .catch((error)=>{
         console.error("error adding document: ",error);
         });
        


     }

    render(){
        //FOR CARD
    const {name, description} = this.state;
    const cardStyles = {
        width : '40rem',
        height : 'auto',
        backgroundColor : 'white',
        margin: 'auto',
        display : 'block',
        marginTop : '60px',
        opacity : 0.5,
        paddingTop : '10px',
        paddingLeft : '20px',
        paddingRight : '20px',
        borderStyle : 'outset',
        borderLeft : '50px solid pink',
        // borderRadius :'20px'
      }
        return(
            <div>
                <Card style={cardStyles}>
                <div className="Buttons">
                <Link to = "/">
                 <button class="Edit-Button">SHOW PRODUCTS</button>
                  </Link> 
                  </div> 
                 <div>
                 <div >
                  <div class="form-group"></div>
                      <label for = "name">Product Name:</label>
                      <input type="text" class="form-control" name = "name" value ={name} onChange={this.onChange} placeholder="Please Enter Name"/>
                 </div>

                  <div>
                  <div class="form-group"></div>
                      <label for = "description">Product Description:</label>
                      <textArea class="form-control" name = "description" onChange={this.onChange} placeholder="Description" cols="80" rows = "3">{description}</textArea>
                                        
                  </div>
                 </div>

                  <div class="upload-btn-wrapper">
                      <button class="file-btn">Choose a file</button>
                  <input type="file" onChange={this.handleChange}/>
                  </div>


                  <div className="upload-data">                     
                      <img src = {this.state.url} height="200px" width="200px"/>                     
                  </div>


                  <div className="Buttons">
                      <button class="Submit-Button" onClick={this.handleUpload}>Upload Image First</button>
                      <button class="Submit-Button" onClick={this.onSubmit}>Save All</button>
                  </div>
                </Card>
            </div>
        )
    }
}

export default AddProduct;