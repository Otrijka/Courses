import { Controller } from 'react-hook-form'
import * as ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

TextEditToolbar.modules = {
	toolbar: [
		[{ header: [false, 1, 2, 3] }, { font: [] }],
		[{ size: [] }, { align: [] }, { color: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image', 'video'],
	],
}

export function TextEditToolbar({ ...other }) {
	return (
		<div className={other.className}>
			<Controller
				name={other.name}
				control={other.control}
				render={({ field: { value, onChange } }) => {
					return (
						<ReactQuill
							value={value}
							onChange={(editorState, delta, source, editor) => {
								if (editor.getText().length === 1) {
									editorState = ''
								}
								onChange(editorState)
							}}
							modules={TextEditToolbar.modules}
						/>
					)
				}}
			/>
		</div>
	)
}
