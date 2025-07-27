import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function RatingComponent({ id_car }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    let isMounted = true;
    axios.get(`http://localhost:8888/ratings/${id_car}`)
      .then(res => {
        if (isMounted && res.data?.average) {
          setValue(res.data.average);
        }
      })
      .catch(err => console.error("❌ Failed to fetch rating", err));

    return () => {
      isMounted = false;
    };
  }, [id_car]);

  const handleChange = (event, newValue) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.id_user) {
      console.error("❌ No user found in localStorage.");
      return;
    }

    setValue(newValue);

    axios.post(`http://localhost:8888/ratings`, {
      id_car: id_car,
      id_user: user.id_user,
      star: newValue
    })
      .then(() => {
        // re-fetch average after rating is saved
        axios.get(`http://localhost:8888/ratings/${id_car}`)
          .then(res => {
            if (res.data?.average) {
              setValue(res.data.average);
            }
          });
      })
      .catch(err => {
        console.error("❌ Failed to submit rating", err);
      });
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Rating
        name={`rating-${id_car}`}
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={handleChange}
        onChangeActive={(event, newHover) => setHover(newHover)}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
    </Box>
  );
}
