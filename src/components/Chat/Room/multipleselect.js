import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {InputLabel,FormControl,Select,MenuItem,makeStyles,Chip,Input,useTheme} from '@material-ui/core'
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
    formControl: {
      margin:'-10px 0 0 42px',
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
export default function Multiple_select({chat,value}) {
    const [users,setusers]=useState([])
    const dispatch=useDispatch()
    const {Details}=useSelector(state=>state.update)
    const selector=useSelector(state=>state.Chat?.Data);
    const theme=useTheme()
    // if(newdata.Members.length===0) setPersonName([])
    const classes=useStyles()
    const handleChange = (event) => {
        // setPersonName(event.target.value);
          dispatch({type:'ROOM_CHANGE',payload:{name:"Members",value:event.target.value}});

      };

      useEffect(()=>{
            axios.get(`${process?.env?.REACT_APP_URL}/users`).then((res)=>{
              // console.log('Users',res.data)
              setusers(res.data.users)
            }).catch(err=>console.log(err.message))
      },[])
    return (
        <div>
          {
            users?
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value= {selector.Members}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div  className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value?.Name} label={value?.Name} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {users.map((name,index) => (
                <MenuItem key={index} value={name} style={getStyles(name?.Name,Details.Members, theme)}>
                  {name?.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>:<div></div>
          }
        </div>
    )
}
