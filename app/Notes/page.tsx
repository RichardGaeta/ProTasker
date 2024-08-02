import NoteDirectory from './NoteDirectory';
import NoteView from './NoteView';

export default function Home() {

  return (
    <div className='h-screen w-full flex flex-row'>
      <NoteDirectory />
      <NoteView />
    </div>
  );
}
/**
 * Will be designed like a file directory
 */