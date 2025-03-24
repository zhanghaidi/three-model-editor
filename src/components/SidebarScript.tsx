import { Button, Input, List, Modal, message } from 'antd';
import { useEffect, useState } from 'react';

import { useEditorStore } from '@/store/editorStore';
import { useScriptStore } from '@/store/scriptStore';

const SidebarScript = () => {
  const { selectedObject } = useEditorStore();
  const { scripts, addScript, removeScript, updateScript } = useScriptStore();
  const [currentScripts, setCurrentScripts] = useState<{ name: string; source: string }[]>([]);
  const [editingScript, setEditingScript] = useState<{ name: string; source: string } | null>(null);

  useEffect(() => {
    if (selectedObject) {
      setCurrentScripts(scripts[selectedObject.uuid] || []);
    }
  }, [selectedObject, scripts]);

  const handleAddScript = () => {
    if (!selectedObject) return;
    const newScript = { name: 'New Script', source: 'function update(event) { console.log("Updating!"); }' };
    addScript(selectedObject.uuid, newScript);
  };

  const handleRemoveScript = (name: string) => {
    if (!selectedObject) return;
    removeScript(selectedObject.uuid, name);
    message.success(`删除脚本：${name}`);
  };

  const handleEditScript = (script: { name: string; source: string }) => {
    setEditingScript(script);
  };

  const handleSaveScript = () => {
    if (!selectedObject || !editingScript) return;
    updateScript(selectedObject.uuid, editingScript);
    setEditingScript(null);
  };

  return (
    <div className="sidebar-script">
      <Button type="primary" onClick={handleAddScript} style={{ marginBottom: 10 }}>
        添加脚本
      </Button>
      <List
        size="small"
        dataSource={currentScripts}
        renderItem={(script) => (
          <List.Item
            key={script.name} // 为 List.Item 添加 key
            actions={[
              <Button
                key="remove" // 为 Button 添加 key
                type="text"
                danger
                onClick={() => handleRemoveScript(script.name)}
              >
                删除
              </Button>,
            ]}
            onDoubleClick={() => handleEditScript(script)}
          >
            <Input defaultValue={script.name} />
          </List.Item>
        )}
      />
      <Modal title="编辑脚本" open={!!editingScript} onCancel={() => setEditingScript(null)} onOk={handleSaveScript}>
        <Input
          value={editingScript?.name}
          onChange={(e) => setEditingScript((prev) => (prev ? { ...prev, name: e.target.value } : null))}
        />
        <Input.TextArea
          value={editingScript?.source}
          onChange={(e) => setEditingScript((prev) => (prev ? { ...prev, source: e.target.value } : null))}
          rows={6}
        />
      </Modal>
    </div>
  );
};

export default SidebarScript;
