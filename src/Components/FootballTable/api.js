import axios from "axios";

export const getAllLeauge = () => {
    return axios.get(
        `https://www.thesportsdb.com/api/v1/json/123/all_leagues.php`
    );
};

export const getTableData = (data) => {
    return axios.get(
        `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=${data.leaugeId}&s=${data.season}`
    );
};