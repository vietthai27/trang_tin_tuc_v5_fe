import {
  Box,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  changePageNum,
  getNewsBySubCategoryRequest,
  getSubCategoryListRequest
} from "./reducer";
import PropTypes from "prop-types";
import Paging from "../../Components/Paging/Paging";

/* =======================
   Custom Tab Panel
======================= */
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

/* =======================
   Category News Page
======================= */
export default function CategoryNewsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    subCategoryList,
    categoryName,
    search,
    pageNum,
    pageSize,
    newsByCategoryList
  } = useSelector(state => state.categoryNewsPage);

  const [value, setValue] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const navigate = useNavigate()

  /* -----------------------
     Load sub categories
  ----------------------- */
  useEffect(() => {
    if (!id) return;
    dispatch(getSubCategoryListRequest({ id }));
  }, [dispatch, id]);

  /* ---------------------------------------
     Auto select first sub category + load news
     (GUARD: never dispatch with undefined id)
  --------------------------------------- */
  useEffect(() => {
    if (!subCategoryList || subCategoryList.length === 0) return;

    const firstSubCategoryId = subCategoryList[0]?.id;
    if (!firstSubCategoryId) return;

    setValue(0);
    setSelectedSubCategory(firstSubCategoryId);

    dispatch(
      getNewsBySubCategoryRequest({
        search,
        categoryId: firstSubCategoryId,
        pageNum,
        pageSize
      })
    );
  }, [subCategoryList, dispatch, search, pageNum, pageSize]);

  const totalPages = newsByCategoryList?.totalPages || 0;

  /* -----------------------
     Handle tab change
     (GUARD: index & id)
  ----------------------- */
  const handleChange = (event, newValue) => {
    if (!subCategoryList?.[newValue]?.id) return;

    const subCategoryId = subCategoryList[newValue].id;

    setValue(newValue);
    setSelectedSubCategory(subCategoryId);

    dispatch(
      getNewsBySubCategoryRequest({
        search,
        categoryId: subCategoryId,
        pageNum,
        pageSize
      })
    );
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handlePageChange = (newPageNum) => {
    dispatch(changePageNum(newPageNum));
  };

  return (
    <Box>
      <Typography variant="h6" margin={2} textAlign="center">
        {categoryName}
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            {subCategoryList?.length > 0 ? (
              subCategoryList.map((e, index) => (
                <Tab
                  key={e.id}
                  label={e.name}
                  {...a11yProps(index)}
                />
              ))
            ) : (
              <Tab label="No data" {...a11yProps(0)} />
            )}
          </Tabs>
        </Box>

        {/* News list example */}
        <Box p={2}>
          {newsByCategoryList.content?.length > 0 ? (

            newsByCategoryList.content.map(news => (
              <Box
                key={news.id}
                mb={2}
                display="flex"
                gap={2}
                alignItems="flex-start"
                onClick={() => {navigate("/news-detail/" + news.id)}}
              >
                {/* Thumbnail */}
                <Box
                  component="img"
                  src={news.thumbnail}
                  alt={news.title}
                  sx={{
                    width: 120,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 1,
                    flexShrink: 0,
                  }}
                />

                {/* Content */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {news.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {news.description}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ mt: 0.5, display: "block" }}
                  >
                    {news.writer} • {new Date(news.createdAt).toLocaleDateString("vi-VN")}
                  </Typography>
                </Box>
              </Box>

            ))


          ) : (
            <Typography variant="body2" color="text.secondary">
              No news
            </Typography>
          )}
          < Box mt={3} display="flex" justifyContent="center">
            <Paging
              page={pageNum}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Box>
      </Box>
    </Box >
  );
}
