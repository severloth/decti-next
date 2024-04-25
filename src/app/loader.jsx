import { Box } from '@mui/system';
import Image from 'next/image';
import { lineWobble } from 'ldrs';
lineWobble.register();



const Loader = () => {
    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box sx={{ width: '40%' }}>
                <Image
                    src="/logoUtec.png"
                    alt="logo"
                    width={100}
                    height={100}
                    style={{ display: 'block', margin: '0 auto', marginBottom: '30px' }}
                />

                <l-line-wobble
                    style={{ display: 'block', margin: '0 auto', marginBottom: '30px' }}
                    size="240"
                    stroke="8"
                    bg-opacity="0.1"
                    speed="1.3"
                    color="#00627E"
                ></l-line-wobble>

            </Box>
        </div>
    )
}

export default Loader;