import styled from "styled-components";
import img from "../../images/background.jpg"

export const WallpaperImg = styled.div`
    width: 100%;
    height: 100%;
    background: url(${img});
    background-repeat:no-repeat;
    background-size:cover;
    opacity:0.05;
`;