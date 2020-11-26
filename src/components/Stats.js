import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { VictoryChart, VictoryLine } from "victory";

const Wrapper = styled.div`
  background: #393e46;
  color: #ffd369;
  box-sizing: border-box;
  .container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
  }

  .buttons {
    margin-top: 3rem;
    width: 60%;
    display: flex;
    justify-content: space-between;
  }

  button {
    border-radius: 3px;
    padding: 0.5rem 0;
    width: 11rem;
    background: transparent;
    color: white;
    border: 2px solid #000000;
    font-size: 1.5rem;
  }

  button:hover {
    background-color: #ffd369;
    color: #393e46;
    border-color: #ffd369;
  }

  button:focus {
    background-color: #ffd369;
    color: #393e46;
    border-color: #ffd369;
  }
  h1 {
    font-size: 3rem;
  }

  * {
    margin: 0;
  }
  @media (max-width: 768px) {
    height: 100vh;
    .buttons {
      flex-direction: column;
      align-items: center;
    }
    .VictoryContainer {
      margin-top: 3rem;
      background-color: white;
    }
    button {
      margin-bottom: 2rem;
    }
  }
`;

const Stats = () => {
  const { country } = useParams();
  const [data, setData] = useState();
  const [display, setDisplay] = useState();
  const handleDisplay = (info) => {
    setDisplay(data[info]);
  };
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`
      );
      setData(data.timeline);
      setDisplay(data.timeline.cases);
    };
    getData();
  }, [country]);

  return (
    <Wrapper>
      <div className="container">
        <h1>{country}</h1>
        <div className="buttons">
          <button onClick={() => handleDisplay("cases")}>Cases</button>
          <button onClick={() => handleDisplay("deaths")}>Deaths</button>
          <button onClick={() => handleDisplay("recovered")}>Recovered</button>
        </div>
        {display && (
          <VictoryChart
            height={200}
            padding={{
              left: 80,
              top: 20,
              bottom: 80,
              right: 20,
            }}
            style={{
              parent: {
                height: "50%",
              },
            }}
            scale={{ x: "time" }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          >
            <VictoryLine
              interpolation="linear"
              data={Object.keys(display).map((data, index) => {
                return {
                  x: new Date(data),
                  y: +Object.values(display)[index],
                };
              })}
              style={{ data: { stroke: "#c43a31", strokeWidth: 1 } }}
            />
          </VictoryChart>
        )}
      </div>
    </Wrapper>
  );
};

export default Stats;
