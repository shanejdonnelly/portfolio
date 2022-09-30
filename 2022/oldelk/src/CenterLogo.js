import { Center, Image } from '@chakra-ui/react';

const CenterLogo = ({ imgAlt, imgSrc, width }) => {
    const halfWidth = `${width / 2}px`;
    const negHalfWidth = `${-1 * (width / 2)}px`;
    const paddedWidth = `${width + 40}px`;

    return (
        <Center borderTopWidth={'2px'} borderTopColor={'brand'} borderTopStyle={'solid'} marginTop={halfWidth} width={'100%'}>
            <Center marginTop={negHalfWidth} width={paddedWidth} backgroundColor={'black'}>
                <Center width={width}>
                    <Image src={imgSrc} alt={imgAlt} width={'100%'} />
                </Center>
            </Center>
        </Center >
    )
}

export default CenterLogo;