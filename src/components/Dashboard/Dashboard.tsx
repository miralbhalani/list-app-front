import React, { FC } from 'react';
import Lists from '../Lists/Lists';
import './Dashboard.css';
import Login from '../Login/Login';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {


  const hasToken = localStorage.token;

  return (
    <>
      {
        hasToken && <div className='Dashboard'>
        <div className='left-pane'>
          <div className='left-pane-item list-app-title'>
            MOVIE LIST
          </div>
          <Lists></Lists>
        </div>
        <div className='right-pane'>
          <div className='right-pane-header'>
            <div className='right-pane-header-todo'>
              HOME
            </div>
          </div>
          <div className='right-pane-list-container'>
            {/* LIST */}
            
            <div className="movies">
              <div className="movie">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmMH-bEDUS2TmK8amBqgIMgrfzN1_mImChPuMrunA1XjNTSKm" />
                  <div>
                    <h2>The Shawshank Redemption</h2>
                    <p>Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.</p>
                  </div>
              </div>

              <div className="movie">
                <img src="data:image/jpeg;base64,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" />
                  <div>
                    <h2>The Godfather</h2>
                    <p>The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.</p>
                  </div>
              </div>

              <div className="movie">
                <img src="data:image/jpeg;base64,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" />
                  <div>
                    <h2>The Dark Knight</h2>
                    <p>When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div> || <Login></Login>
      }
    </>
  )
};

export default Dashboard;
