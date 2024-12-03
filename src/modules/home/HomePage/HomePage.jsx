import React from 'react';
import Header from '../../../components/Header';
import Banner from '../../../components/Banner';
import MovieSchedule from '../../../components/MovieSchedule';

export default function HomePage() {
  return (
    <div>
      <h1>
        <Header />
        <Banner />
        <MovieSchedule />

      </h1>
    </div>
  );
}
