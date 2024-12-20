import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const CreatePanel = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/panels',
    method: 'post',
    body: {
      title,
      price
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  }

  const onBlur = () => {
    const value = parseFloat(price);

    if(isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  }

  return (
    <div>
      <h1>Create a Panel</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="form-control"> 
          </input>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)} 
            className="form-control">
          </input>
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreatePanel;