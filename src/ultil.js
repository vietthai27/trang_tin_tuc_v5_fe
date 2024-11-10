import axios from "axios";

// Render hosting-----------------------------------------------
// export const host = 'https://trang-tin-tuc-v5-be.onrender.com'
// Local hosting------------------------------------------------
export const host = 'https://thai27webdev.io.vn'
// network hosting______________________________________________
//export const host = 'http://192.168.0.86:8080'
// AWS hosting-----------------------------------------------
// export const host = 'http://ec2-3-107-187-197.ap-southeast-2.compute.amazonaws.com:8080'

// BE host: https://dashboard.render.com/web/srv-cpe38bvsc6pc7398s540/deploys/dep-cpe4h4n109ks73epgsl0?r=2024-06-02%4010%3A24%3A24%7E2024-06-02%4010%3A32%3A30
// DB host: https://console.aiven.io/account/a4b1c34f2366/project/thai27webdeveloper-7dc4/services/pg-20cb3ce/overview

export const apiMenu = '/danhmuc'
export const apiUser = '/user'
export const apiSubMenu = '/danhmuccon'
export const apiNews = '/baibao'
export const apiCheckToken = '/permit/tokenIsExpired'

export const address = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.5209927235933!2d105.76464706492663!3d21.01182991885578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453594e700953%3A0xdbaaf70dcbb82eb4!2zUGjDuiDEkMO0LCBOYW0gVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1720023956876!5m2!1svi!2s'

export const checkUserSessionApi = async (token) => {
    return await axios.get(host + apiUser + `/permit/getClaimsFromToken?token=${token}`)
}

export const getNextAndPreviousFourYears = () => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];

    for (let i = 0; i < 5; i++) {
        const startYear = currentYear + 1 - i;
        const endYear = currentYear - i;
        yearsArray.push(`${endYear}-${startYear}`);
    }

    return yearsArray;
}

export const getFirstAndLastOfNextFiveDays = () => {
    const today = new Date();
    const firstDay = new Date();
    firstDay.setDate(today.getDate() );
    const formattedfirstDay = firstDay.toISOString().split('T')[0];
    const lastDay = new Date(today);
    lastDay.setDate(today.getDate() + 5);
    const formattedLastDay = lastDay.toISOString().split('T')[0];

    return [formattedfirstDay, formattedLastDay];
}
