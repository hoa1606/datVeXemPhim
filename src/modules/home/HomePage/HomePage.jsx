import React from 'react';
import Header from '../../../components/Header';
import Banner from '../../../components/Banner';
import MovieSchedule from '../../../components/MovieSchedule';
import TheaterInfo from '../../../components/TheaterInfo';

export default function HomePage() {
  return (
    <div>
      <h1>
        <Header />
        <Banner />
        <MovieSchedule />
        <TheaterInfo />
      </h1>
    </div>
  );
}
