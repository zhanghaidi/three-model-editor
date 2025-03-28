import { Input, Row, Col, Switch, InputNumber, Space } from 'antd';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

import { useEditorStore } from '@/store/editorStore';

import SidebarObjectAnimation from './SidebarObjectAnimation';

const SidebarObject = () => {
  const { selectedObject, setSelectedObject } = useEditorStore();

  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([1, 1, 1]);
  const [visible, setVisible] = useState(true);
  const [objectName, setObjectName] = useState('');

  // ✅ **监听选中对象的变化**
  useEffect(() => {
    if (!selectedObject) return;

    setPosition([selectedObject.position.x, selectedObject.position.y, selectedObject.position.z]);

    setRotation([
      THREE.MathUtils.radToDeg(selectedObject.rotation.x),
      THREE.MathUtils.radToDeg(selectedObject.rotation.y),
      THREE.MathUtils.radToDeg(selectedObject.rotation.z),
    ]);

    setScale([selectedObject.scale.x, selectedObject.scale.y, selectedObject.scale.z]);

    setObjectName(selectedObject.name || '');
    setVisible(selectedObject.visible);
  }, [selectedObject]);

  // ✅ **更新 Three.js 物体**
  const updateObject = (key: string, value: any) => {
    if (!selectedObject) return;

    if (key === 'position') {
      selectedObject.position.set(value[0], value[1], value[2]);
    } else if (key === 'rotation') {
      selectedObject.rotation.set(
        THREE.MathUtils.degToRad(value[0]),
        THREE.MathUtils.degToRad(value[1]),
        THREE.MathUtils.degToRad(value[2]),
      );
    } else if (key === 'scale') {
      selectedObject.scale.set(value[0], value[1], value[2]);
    } else if (key === 'visible') {
      selectedObject.visible = value;
    } else if (key === 'name') {
      selectedObject.name = value;
    }

    setSelectedObject(selectedObject); // 触发 UI 更新
  };

  return (
    <div className="sidebar-object">
      {selectedObject ? (
        <div>
          <Space direction="vertical">
            <Row>
              <Col span={6}>类型</Col>
              <Col span={18}>
                <span>{selectedObject.type}</span>
              </Col>
            </Row>
            {/* ✅ **对象名称** */}
            <Row>
              <Col span={6}>名称</Col>
              <Col span={18}>
                <Input
                  value={objectName}
                  onChange={(e) => {
                    setObjectName(e.target.value);
                    updateObject('name', e.target.value);
                  }}
                />
              </Col>
            </Row>

            {/* ✅ **位置** */}
            <Row>
              <Col span={6}>位置</Col>
              <Col span={18}>
                <Space>
                  {['X', 'Y', 'Z'].map((axis, index) => (
                    <InputNumber
                      key={axis}
                      value={position[index]}
                      onChange={(value) => {
                        const newPos = [...position];
                        newPos[index] = value || 0;
                        setPosition(newPos);
                        updateObject('position', newPos);
                      }}
                    />
                  ))}
                </Space>
              </Col>
            </Row>

            {/* ✅ **旋转（角度制）** */}
            <Row>
              <Col span={6}>旋转</Col>
              <Col span={18}>
                <Space>
                  {['X', 'Y', 'Z'].map((axis, index) => (
                    <InputNumber
                      key={axis}
                      value={rotation[index]}
                      onChange={(value) => {
                        const newRot = [...rotation];
                        newRot[index] = value || 0;
                        setRotation(newRot);
                        updateObject('rotation', newRot);
                      }}
                    />
                  ))}
                </Space>
              </Col>
            </Row>

            {/* ✅ **缩放** */}
            <Row>
              <Col span={6}>缩放</Col>
              <Col span={18}>
                <Space>
                  {['X', 'Y', 'Z'].map((axis, index) => (
                    <InputNumber
                      key={axis}
                      value={scale[index]}
                      min={0.01}
                      onChange={(value) => {
                        const newScale = [...scale];
                        newScale[index] = value || 1;
                        setScale(newScale);
                        updateObject('scale', newScale);
                      }}
                    />
                  ))}
                </Space>
              </Col>
            </Row>

            {/* ✅ **可见性** */}
            <Row>
              <Col span={6}>可见性</Col>
              <Col span={18}>
                <Switch
                  checked={visible}
                  onChange={(checked) => {
                    setVisible(checked);
                    updateObject('visible', checked);
                  }}
                />
              </Col>
            </Row>
          </Space>
          <SidebarObjectAnimation />
        </div>
      ) : (
        <p>未选中对象</p>
      )}
    </div>
  );
};

export default SidebarObject;
