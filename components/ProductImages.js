import React, { useState } from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const MainImage = styled.img`
    max-width: 100%;
    max-height: 350px;
`;

const MainImageWrapper = styled.div`
    text-align: center;
`;

const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const ImageButton = styled.div`
    border: 2px solid #ccc;
    height: 60px;
    padding: 5px;
    margin-top: 10px;
    border-radius: 3px;
    cursor: pointer;

    ${props => props.active ? `
        border-color: red;
    `: `border-color: transparent;
        opacity:.7`}
`;

const SelectableImage = styled.img`
    max-height: 100%;
`;

export default function ProductImages({ images }) {
    const [selectedImage, setSelectedImage] = useState(images?.[0]);

    return (
        <ImageContainer>
            <MainImageWrapper>
                <MainImage src={selectedImage} />
            </MainImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton key={image} active={image === selectedImage} onClick={() => setSelectedImage(image)}>
                        <SelectableImage src={image} alt="" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </ImageContainer>
    );
}
