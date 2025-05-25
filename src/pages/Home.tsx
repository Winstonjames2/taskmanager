import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WeatherCard from "../components/WeatherCard";
import TodoList from "../components/TodoList";

const Home: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <WeatherCard />
        <TodoList />
      </div>
    </DndProvider>
  );
};

export default Home;
