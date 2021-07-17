import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 165,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Question(props) {
  const classes = useStyles();
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  // update new signed up user
  const update = (gender, height, address, age, description, url, id) => {
    let updateUser = {
      id,
      gender,
      height,
      address,
      age,
      description,
      url,
    };
    axios
      .put(`api/signup/${props.id}`, { updateUser })
      .then(() => console.log('done'))
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          alt="logo"
          src="https://github.com/MattLuo90/CanDate/blob/master/react-front-end/src/docs/logo.jpg?raw=true"
          width="80"
          style={{ marginTop: '-40px', marginBottom: '10px' }}
        />
        <Typography component="h1" variant="h5">
          Tell us about yourself
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => e.preventDefault()}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={gender}
                  label="Gender"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Height(cm)
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={height}
                  label="Height(cm)"
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                >
                  <MenuItem value={150}>150</MenuItem>
                  <MenuItem value={151}>151</MenuItem>
                  <MenuItem value={152}>152</MenuItem>
                  <MenuItem value={153}>153</MenuItem>
                  <MenuItem value={154}>154</MenuItem>
                  <MenuItem value={155}>155</MenuItem>
                  <MenuItem value={156}>156</MenuItem>
                  <MenuItem value={157}>157</MenuItem>
                  <MenuItem value={158}>158</MenuItem>
                  <MenuItem value={159}>159</MenuItem>
                  <MenuItem value={160}>160</MenuItem>
                  <MenuItem value={161}>161</MenuItem>
                  <MenuItem value={162}>162</MenuItem>
                  <MenuItem value={163}>163</MenuItem>
                  <MenuItem value={164}>164</MenuItem>
                  <MenuItem value={165}>165</MenuItem>
                  <MenuItem value={166}>166</MenuItem>
                  <MenuItem value={167}>167</MenuItem>
                  <MenuItem value={168}>168</MenuItem>
                  <MenuItem value={169}>169</MenuItem>
                  <MenuItem value={170}>170</MenuItem>
                  <MenuItem value={171}>171</MenuItem>
                  <MenuItem value={172}>172</MenuItem>
                  <MenuItem value={173}>173</MenuItem>
                  <MenuItem value={174}>174</MenuItem>
                  <MenuItem value={175}>175</MenuItem>
                  <MenuItem value={176}>176</MenuItem>
                  <MenuItem value={177}>177</MenuItem>
                  <MenuItem value={178}>178</MenuItem>
                  <MenuItem value={179}>179</MenuItem>
                  <MenuItem value={180}>180</MenuItem>
                  <MenuItem value={181}>181</MenuItem>
                  <MenuItem value={182}>182</MenuItem>
                  <MenuItem value={183}>183</MenuItem>
                  <MenuItem value={184}>184</MenuItem>
                  <MenuItem value={185}>185</MenuItem>
                  <MenuItem value={186}>186</MenuItem>
                  <MenuItem value={187}>187</MenuItem>
                  <MenuItem value={188}>188</MenuItem>
                  <MenuItem value={189}>189</MenuItem>
                  <MenuItem value={190}>190</MenuItem>
                  <MenuItem value={191}>191</MenuItem>
                  <MenuItem value={192}>192</MenuItem>
                  <MenuItem value={193}>193</MenuItem>
                  <MenuItem value={194}>194</MenuItem>
                  <MenuItem value={195}>195</MenuItem>
                  <MenuItem value={196}>196</MenuItem>
                  <MenuItem value={197}>197</MenuItem>
                  <MenuItem value={198}>198</MenuItem>
                  <MenuItem value={199}>199</MenuItem>
                  <MenuItem value={200}>200</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                autoComplete="address"
                label="Address(City)"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="profile-photo"
                label="Profile Photo Url"
                type="text"
                id="profile-photo"
                autoComplete="url"
                onChange={(e) => setUrl(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="about-you"
                label="About you"
                type="text"
                id="about-you"
                autoComplete="about_me"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              props.tagPage();
              update(gender, height, address, age, description, url, props.id);
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
