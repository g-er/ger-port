import '../styles/global.css';
import Carousel from '../components/Carousel';
import ScrollableText from '../components/ScrollableText';

export default function Cycles() {
  return (
    <div className="project-section">
      <div className="project-carousel">
        <Carousel folder="cycles" />
      </div>
      <div className="project-text">
        <div className="project-description">
          <ScrollableText>
            <h1>cycles</h1>
            <p className="description">
              The work offers a look at algorithm-based tracking systems through an ecological lens. 
              In the process of data collection and utilization, the boundary between the biological and the programmed gets eroded. 
              A user interacts with a node-based system which responds using patterns collected while observing previous users. 
              Through this, the user and the system experience connection. A seemingly emergent third being appears out of the 
              informational shadow of a past and present user.
            </p>
          </ScrollableText>
        </div>
        <dl className="project-meta">
          <dt>first exhibited</dt>
          <dd>2024, Vilnius art academy</dd>
          <dt>materials</dt>
          <dd>Projector, camera, computer, custom software</dd>
          <dt>length</dt>
          <dd>Variable duration</dd>
        </dl>
      </div>
    </div>
  );
}
