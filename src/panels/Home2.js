import React from 'react';
import {
    PanelHeader,
    Button,
    Div,
    Panel,
    HorizontalScroll,
    Link,
} from '@vkontakte/vkui';
import Container from '../components/container/Container';
import { Icon28DeleteOutline } from '@vkontakte/icons';

const Home2 = ({ id, setActiveModal, fieldStore, updateField }) => {

    const vkt = (
        <Div className={'PanelHeader__vkt'}>
            <Link href='https://vk.com/testers'>
                <img src={'./vkt.svg'} height={30}/>
            </Link> × Бинго
        </Div>
    );

    return (
        <Panel id={id}>
            <PanelHeader>Бинго</PanelHeader>

            <HorizontalScroll>
                <Container fieldStore={fieldStore} updateField={updateField} />
            </HorizontalScroll>


            <Div style={{display: 'flex'}}>
           
       <Button mode="destructive" onClick={('home')} before={<Icon28DeleteOutline />} size="l"></Button><Div></Div>

     </Div>
            
        </Panel>
    );
};

export default Home2;
