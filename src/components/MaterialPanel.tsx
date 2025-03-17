import MaterialList from './MaterialList';

const MaterialPanel: React.FC = () => {
  return (
    <div className="p-3 bg-gray-800 text-white rounded-md">
      <h3 className="mb-2">材质列表</h3>
      <MaterialList />
    </div>
  );
};

export default MaterialPanel;
