import { HTMLFileViewer } from './HTMLFileViewer';
import centering from '../html/centering.html?url';

const paths = [centering];

const BoxLab = () => {
  return (
    <>
      <h1>BOX DOM LAB</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {paths.map((path) => (
          <HTMLFileViewer
            key={path}
            path={path}
            style={{ maxHeight: '30%', width: '90%' }}
          ></HTMLFileViewer>
        ))}
      </div>
    </>
  );
};

export { BoxLab };
