import { TailSpin } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <TailSpin color="#FFF" height={80} width={80} />
        </div>
        )
}

export default Loading;