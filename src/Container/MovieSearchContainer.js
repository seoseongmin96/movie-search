import React, {Fragment, useState} from 'react'
import { Input, Row, Col } from 'antd';
import MovieCard from '../Component/movieCard';


import axios from 'axios';
const {Search} = Input;

const MovieSearchContainer = () => {
    const [query, setQuery] = useState('');
    const handleQuery = (e) => {
        setQuery(e.target.value);
    };
    const [items, setItems] = useState();

    const handleButton = async () => {
        try {
            const res = await axios.get("http://localhost:3001/naver/getNaverMovie", {
                params: {
                    query: query,
                },
            });
            if (res && res.status === 200) {
                const {data} = res;
                console.log(data);
                setItems(data.items);
            }
        } catch (e) {
            console.log("error", e);
        }
    };
  return (
    <Fragment>
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem'}}>
      <Search
        placeholder="영화를 검색해 보세요!"
        onSearch={(value) => console.log(value)}
        onChange={handleQuery}
        onClick={handleButton}
        style={{ width: 200 }}
      />
      
    </div>
    <div>
    <Row>
    {items && items.map((item) => {
        return (
            <Col xs={24} sm={12} md={6} lg={4} xl={4}>
            <MovieCard item={item}></MovieCard>
            </Col>
        );
    })};
    </Row>
    </div>
    </Fragment>
  );
};
export default MovieSearchContainer;