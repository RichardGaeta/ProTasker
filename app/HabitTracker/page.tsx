import HabitList from './HabitList';
import HabitInfo from './HabitInfo';

export default function Home() {

  return (
    <div className='h-full flex flex-grow justify-center items-center flex-row'>
      <HabitList />
      <HabitInfo />
    </div>
  );
}