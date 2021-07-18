import React, { useEffect } from 'react';
import TagList from './TagList';
import useVisualMode from '../../hooks/useVisualMode';
import Question from './Question';
import SignIn from './SignIn';
import Form from './Form';
import './Home.scss';

export default function Home(props) {
  const FORM = 'FORM';
  const QUESTION = 'QUESTION';
  const TAG = 'TAG';
  const SIGN = 'SIGN';
  const id = props.image.length + 1;
  const { mode, transition, back } = useVisualMode(FORM);

  function change() {
    transition(QUESTION);
  }
  function tagPage() {
    transition(TAG);
  }
  function Sign() {
    transition(SIGN);
  }

  useEffect(() => {
    const gradient = document.querySelector('.gradient');

    function onMouseMove(event) {
      gradient.style.backgroundImage =
        'radial-gradient(at ' +
        event.clientX +
        'px ' +
        event.clientY +
        'px, #f2a1a3 0, rgb(104, 69, 145) 50%)';
    }
    document.addEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="home-container">
      {/* div for the home page image wall effect */}
      <div className="gradient"></div>
      <div className="register">
        {mode === FORM && <Form change={change} SignIn={Sign} />}
        {mode === QUESTION && <Question tagPage={tagPage} id={id} />}
        {mode === TAG && <TagList tags={props.tags} id={id} />}
        {mode === SIGN && (
          <SignIn
            back={back}
            users={props.image}
            findPasswordByEmail={props.findPasswordByEmail}
          />
        )}
      </div>
    </div>
  );
}
