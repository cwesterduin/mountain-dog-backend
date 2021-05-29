import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import * as formStyles from "../form.module.css";
import { useParams } from "@reach/router";
import { getData } from "../../requests";
import Autocomplete from "@material-ui/lab/Autocomplete";

function Media() {
  const { id } = useParams();
  const [pathOptions, setPathOptions] = useState([])
  const [eventOptions, setEventOptions] = useState([])
  const [formData, setFormData] = useState({
    Path: {Key: ""},
    Description: "",
    Type: "",
    EventID: {EventID: ""},
    Order: "",
  });

  useEffect(() => {
    async function fetchFormState() {
      const data = await getData(`media/${id}`);
      setFormData({
        Path: {Key: data.Path} || {Key: ""},
        Description: data.Description || "",
        Type: data.Type || "",
        EventID: {EventID: data.EventID} || {EventID: ""},
        Order: data.Order || "",
      });
    }
    async function fetchS3PathOptions() {
        const data = await getData(`s3`);
        setPathOptions(
            data.results
        );
      }
    
      async function fetchEventOptions() {
        const data = await getData(`events`);
        setEventOptions(
            data.results
        );
      }

    id && fetchFormState();
    fetchS3PathOptions()
    fetchEventOptions()
  }, []);


  function handleInputChange(e){
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFormData({
        ...formData,
      [name]: value
    });
  }




  return (
    <form className={formStyles.form} noValidate autoComplete="off">
        { formData.Path && <img src={`https://alfie192345.s3.eu-west-2.amazonaws.com/images/${formData.Path.Key}`} height={124} width={124}/> }
        <Autocomplete
        id="path-select"
        value={formData.Path}
        renderOption={(option) => (
            <>
            <div>{option.Key}</div>
            </>
        )}
        onChange={(e, newValue) =>
            setFormData({ ...formData, Path: newValue })
          }

        options={pathOptions}
        getOptionLabel={(option) => String(option.Key)}
        renderInput={(params) => (
          <TextField {...params} label="Path" />
        )}
        />
           <TextField
        id="standard-basic"
        label="Description"
        name="Description"
        multiline
        rows={4}
        rowsMax={Infinity}
        value={formData.Description}
        onChange={handleInputChange}
      />
    
    <FormControl>
        <InputLabel id="simple-select-label">Type</InputLabel>
        <Select
          labelId="simple-select-label"
          name="Type"
          id="simple-select"
          value={formData.Type}
          onChange={handleInputChange}
        >
          <MenuItem value={"image"}>Image</MenuItem>
          <MenuItem value={"video"}>Video</MenuItem>
          <MenuItem value={"panorama"}>Panorama</MenuItem>
        </Select>
      </FormControl>


      <Autocomplete
        id="event-select"
        value={formData.EventID}
        renderOption={(option) => (
            <>
            <div>{option.Name}</div>
            </>
        )}
        onChange={(e, newValue) =>
            setFormData({ ...formData, EventID: newValue })
          }

        options={eventOptions}
        getOptionLabel={(option) => String(option.EventID)}
        renderInput={(params) => (
          <TextField {...params} label="Associated Event" />
        )}
        />
     
      <TextField
          id="Order"
          name="Order"
          label="Order"
          type="number"
          value={formData.Order}
          onChange={handleInputChange}
        />
      



      <Button variant="contained" color="primary" type="submit">
        {id ? "Save" : "submit"}
      </Button>
    </form> 
  );
}

export default Media;
