import {
  Box,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSubCategoryListRequest } from "./reducer";
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function CategoryNewsPage() {

  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    subCategoryList,
    categoryName
  } = useSelector(state => state.categoryNewsPage);

  useEffect(() => {
    dispatch(getSubCategoryListRequest({ id }));
  }, [dispatch, id]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box>
      <Typography variant="h6" margin={2} textAlign="center">
        {categoryName}
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {subCategoryList?.length > 0 ? (subCategoryList.map((e) => (
              <Tab label={e.name} {...a11yProps(e.id)} />
            ))) : (<Tab label="No data" {...a11yProps(0)} />)}
          </Tabs>
        </Box>
        {/* {subCategoryList?.length > 0 ? (subCategoryList.map((e) => (
          <CustomTabPanel value={value} index={e.id}>
            {e.name}
          </CustomTabPanel>
        ))) : (<CustomTabPanel value={value} index={0}>
          No data
        </CustomTabPanel>)} */}

      </Box>
    </Box>
  );
}
