import { EyeOutlined, FileOutlined, UploadOutlined, ExportOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Upload, message } from 'antd';

import { useExportStore } from '@/store/exportStore'; // ✅ 引入新的导出 Store
import { useModelStore } from '@/store/modelStore';
import { useSceneStore } from '@/store/sceneStore';

const Header: React.FC = () => {
  const { showGrid, showHelpers, toggleGrid, toggleHelpers } = useSceneStore();
  const { models, importModel } = useModelStore();
  const { exportModel } = useExportStore(); // ✅ 使用导出 Store

  // ✅ 视图菜单
  const viewMenu: MenuProps = {
    selectable: true,
    items: [
      {
        key: 'grid',
        label: (
          <div className="flex justify-between items-center w-full">
            <span>显示网格</span>
            <span className="min-w-[20px]">{showGrid && <CheckOutlined />}</span>
          </div>
        ),
        onClick: (e) => {
          e.domEvent.stopPropagation();
          toggleGrid();
        },
      },
      {
        key: 'helpers',
        label: (
          <div className="flex justify-between items-center w-full">
            <span>显示辅助线</span>
            <span className="min-w-[20px]">{showHelpers && <CheckOutlined />}</span>
          </div>
        ),
        onClick: (e) => {
          e.domEvent.stopPropagation();
          toggleHelpers();
        },
      },
    ],
  };

  // ✅ 导出模型菜单（新增 GLB）
  const exportMenu: MenuProps = {
    items: [
      { key: 'gltf', label: '导出 GLTF (.gltf)', onClick: () => exportModel(models, 'gltf') },
      { key: 'glb', label: '导出 GLB (.glb)', onClick: () => exportModel(models, 'glb') },
      { key: 'obj', label: '导出 OBJ (.obj)', onClick: () => exportModel(models, 'obj') },
      { key: 'stl', label: '导出 STL (.stl)', onClick: () => exportModel(models, 'stl') },
    ],
  };

  // ✅ 文件菜单
  const fileMenu: MenuProps = {
    items: [
      {
        key: 'import',
        label: (
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              const isModel = /\.(gltf|glb|obj|stl)$/i.test(file.name);
              if (!isModel) {
                message.error('只支持 GLTF, GLB, OBJ, STL 文件');
                return false;
              }
              importModel(file);
              return false;
            }}
          >
            <span className="flex items-center gap-2">
              <UploadOutlined />
              导入模型
            </span>
          </Upload>
        ),
      },
      {
        key: 'export',
        label: (
          <Dropdown menu={exportMenu} trigger={['click']} placement="bottomRight">
            <span className="flex items-center gap-2">
              <ExportOutlined />
              导出模型
            </span>
          </Dropdown>
        ),
      },
    ],
  };

  return (
    <header className="h-[50px] flex items-center px-5 bg-gray-900 text-white shadow-md border-b border-gray-700 fixed top-0 left-0 w-full z-50">
      <Space>
        {/* 🔹 文件按钮 */}
        <Dropdown menu={fileMenu} trigger={['click']} placement="bottomLeft">
          <Button icon={<FileOutlined />} className="bg-gray-700 border-none hover:bg-gray-600">
            文件
          </Button>
        </Dropdown>

        {/* 🔹 视图按钮 */}
        <Dropdown menu={viewMenu} trigger={['click']} placement="bottomLeft">
          <Button icon={<EyeOutlined />} className="bg-gray-700 border-none hover:bg-gray-600">
            视图
          </Button>
        </Dropdown>
      </Space>
    </header>
  );
};

export default Header;
